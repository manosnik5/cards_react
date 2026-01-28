import { useState, useEffect } from "react"
import { Card } from "./Card.jsx"
import { CardStats } from "./CardStats.jsx"
import { Sort } from "./Sort.jsx"
import {useQuery} from "@tanstack/react-query"
import { fetchUserCollection } from "../services/apiClient.js"
import '../styles/collection.css'
import { filter, search } from "../assets/index.js"
import { Link, useSearchParams  } from 'react-router-dom';
import { useFilterSort } from "../Contexts/FilterSortContext.jsx"
import { Loader } from "./Loader.jsx"
import { Error } from "./Error.jsx"


export const Collection = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    selectedTypes,
    setSelectedTypes,
    selectedAttributes,
    setSelectedAttributes,
    selectedLevels,
    setSelectedLevels,
    selectedMonsterSpellTrapTypes,
    setSelectedMonsterSpellTrapTypes,
    selectedSortOption,
    setSelectedSortOption
  } = useFilterSort();

  const [selectedCard, setSelectedCard] = useState(null);
  const [isSortbtnPressed, setisSortbtnPressed] = useState(false);
  const [searchCard, setsearchCard] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const types = searchParams.get('types');
    const attributes = searchParams.get('attributes');
    const levels = searchParams.get('levels');
    const monsterSpellTrapTypes = searchParams.get('monsterSpellTrapTypes');
    const sort = searchParams.get('sort');
    const searchQuery = searchParams.get('search');

    if (types) setSelectedTypes(types.split(','));
    if (attributes) setSelectedAttributes(attributes.split(','));
    if (levels) setSelectedLevels(levels.split(',').map(Number));
    if (monsterSpellTrapTypes) setSelectedMonsterSpellTrapTypes(monsterSpellTrapTypes.split(','));
    if (sort) setSelectedSortOption(sort);
    if (searchQuery) {
      setsearchCard(searchQuery);
      setInputValue(searchQuery);
    }

 
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedTypes.length > 0) params.set('types', selectedTypes.join(','));
    if (selectedAttributes.length > 0) params.set('attributes', selectedAttributes.join(','));
    if (selectedLevels.length > 0) params.set('levels', selectedLevels.join(','));
    if (selectedMonsterSpellTrapTypes.length > 0) params.set('monsterSpellTrapTypes', selectedMonsterSpellTrapTypes.join(','));
    if (selectedSortOption) params.set('sort', selectedSortOption);
    if (searchCard) params.set('search', searchCard);

    setSearchParams(params, { replace: true });
  }, [selectedTypes, selectedAttributes, selectedLevels, selectedMonsterSpellTrapTypes, selectedSortOption, searchCard]);

    


  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  
  if (!user || !token) {
    return (
      <div className="noCollection_container">
       <h1>Login to access collection</h1>
      </div>
    ) 
  }


  const {
  isLoading: isLoadingCards,
  isError: isErrorCards,
  data: cards,
} = useQuery({
  queryKey: ['cards', user.userid],
  queryFn: () => fetchUserCollection(),
});



if (isLoadingCards) { return (
     <div className="loader_container">
      <Loader />
    </div>
    );
  }
   
  if (isErrorCards) {
    return (
      <div className="error_container">
        <Error />
      </div>
    )
  }


  const fullCardTypes = [...new Set(cards.map((card) => card.type))];
  const cardTypes = [...new Set(cards.map((card) => card.frametype))];
  const attributeTypes = [...new Set(cards.map((card) => card.attribute))];
  const levelTypes = [...new Set(cards.map((card) => card.level))];
  const monsterSpellTrapTypes = [...new Set(cards.map((card) => card.race))];
  const rarityTypes = [...new Set(cards.map((card) => card.rarity))];
  const packTypes = [...new Set(cards.map((card) => card.set))];

  // Apply filters
  const filteredCards = cards.filter((card) => {
    const matchesType = (!selectedTypes || selectedTypes.length === 0) || selectedTypes.includes(card.frametype);
    const matchesAttribute = (!selectedAttributes || selectedAttributes.length === 0) || selectedAttributes.includes(card.attribute);
    const matchesLevel = (!selectedLevels || selectedLevels.length === 0) || selectedLevels.includes(card.level);
    const macthesMonsterSpellTrapType = (!selectedMonsterSpellTrapTypes || selectedMonsterSpellTrapTypes.length === 0) || selectedMonsterSpellTrapTypes.includes(card.race);
    const rarityType = (!rarityTypes || rarityTypes.length === 0) || rarityTypes.includes(card.rarity);

    const matchesSearchCard = searchCard === '' || card.name.toLowerCase().includes(searchCard.toLowerCase());

    return matchesType && matchesAttribute && matchesLevel && macthesMonsterSpellTrapType && rarityType && matchesSearchCard;
});


  const rarityOrder = ["Common", "Rare", "Super Rare", "Ultra Rare"];

  // Apply sorting
  let sortedCards = [...filteredCards];

 if (!selectedSortOption) {
  // Default sort by cardTypeOrder
  sortedCards.sort((a, b) => {
    const indexA = fullCardTypes.indexOf(a.type);
    const indexB = fullCardTypes.indexOf(b.type);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
  } else if (selectedSortOption === "A-Z") {
    sortedCards.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSortOption === "Z-A") {
    sortedCards.sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectedSortOption === "Highest_Attack") {
    sortedCards.sort((a, b) => (b.attack || 0) - (a.attack || 0));
  } else if (selectedSortOption === "Lowest_Attack") {
    sortedCards.sort((a, b) => (a.attack || 0) - (b.attack || 0));
  } else if (selectedSortOption === "Highest_Defense") {
    sortedCards.sort((a, b) => (b.defense || 0) - (a.defense || 0));
  } else if (selectedSortOption === "Lowest_Defense") {
    sortedCards.sort((a, b) => (a.defense || 0) - (b.defense || 0));
  } else if (selectedSortOption === "Highest_CardLevel") {
    sortedCards.sort((a, b) => (b.level || 0) - (a.level || 0));
  } else if (selectedSortOption === "Lowest_CardLevel") {
    sortedCards.sort((a, b) => (a.level || 0) - (b.level || 0));
  } else if (selectedSortOption === "Highest_CardRarity") {
    sortedCards.sort((a, b) => {
      const indexA = rarityOrder.indexOf(a.rarity);
      const indexB = rarityOrder.indexOf(b.rarity);
      return (indexB === -1 ? -1 : indexB) - (indexA === -1 ? -1 : indexA);
    });
  } else if (selectedSortOption === "Lowest_CardRarity") {
    sortedCards.sort((a, b) => {
      const indexA = rarityOrder.indexOf(a.rarity);
      const indexB = rarityOrder.indexOf(b.rarity);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB); 
  });
}

  const handleSearchCard = () => {
    setsearchCard(inputValue);
  }

  return (
    
    <div className="collection_container">
      <h1 className="collection_title">My Card Collection</h1>
      <div className="filter_container">
        <div className="search_container">
           <input className="searchBar" type="text" placeholder="Search" onChange={(e) => setInputValue(e.target.value)}/>
           <button className="search_btn" onClick={() => handleSearchCard()}>
            <img src={search} alt="" />
           </button>
        </div>

        <button className="sortBtn" onClick={() => setisSortbtnPressed(true)}>
            <h2>Sort</h2>
            <img src={filter} alt="" />
          </button>
         <Link to="/collection/filter" state={{
          cardTypes,
          attributeTypes,
          levelTypes,
          monsterSpellTrapTypes,
        }}>
          <button className="filterBtn">
            <h2>Filters</h2>
            <img src={filter} alt="" />
          </button>
        </Link>
         
      </div>
      
      <div className="cards_grid">
        {sortedCards.map((card) => (
        <div key={card.id} onClick={() => setSelectedCard(card)}>
          <Card data={card} />
        </div>
      ))}
      </div>
        {selectedCard && (
          <CardStats card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
        {isSortbtnPressed && (
          <Sort onClose={() => setisSortbtnPressed(false)} />
        )}
     
        
  </div>
  )
}
