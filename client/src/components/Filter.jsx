import '../styles/filter.css';
import { useLocation, Link } from 'react-router-dom';
import { useFilterSort } from '../Contexts/FilterSortContext';

export const Filter = () => {
  const {
    selectedTypes, setSelectedTypes,
    selectedAttributes, setSelectedAttributes,
    selectedLevels, setSelectedLevels,
    selectedMonsterSpellTrapTypes, setSelectedMonsterSpellTrapTypes,
    clearFilters
  } = useFilterSort();

  const location = useLocation();
  const {
    cardTypes = [],
    attributeTypes = [],
    levelTypes = [],
    monsterSpellTrapTypes = [],
  } = location.state || {};

  const toggleTypes = (type, selected, setSelected) => {
    setSelected(
      selected.includes(type)
        ? selected.filter(t => t !== type)
        : [...selected, type]
    );
  };
  const sortedLevelTypes = levelTypes.map(Number).sort((a, b) => a - b)

  return (
    <div className='filter_options_container'>
      <h1 className="filter_title">Filters</h1>

      <h2>Card Type</h2>
      <div className="card_type_section">
        {cardTypes.map((type, index) => (
          <li key={index}>
            <button
              className={`option_btn ${selectedTypes.includes(type) ? 'selected' : ''}`}
              onClick={() => toggleTypes(type, selectedTypes, setSelectedTypes)}
            >
              {type}
            </button>
          </li>
        ))}
      </div>

      <h2>Attribute</h2>
      <div className="card_type_section">
        {attributeTypes.map((type, index) => (
          <li key={index}>
            <button
              className={`option_btn ${selectedAttributes.includes(type) ? 'selected' : ''}`}
              onClick={() => toggleTypes(type, selectedAttributes, setSelectedAttributes)}
            >
              {type}
            </button>
          </li>
        ))}
      </div>

      <h2>Card Level</h2>
      <div className="card_type_section">
        {sortedLevelTypes.map((type, index) => (
          <li key={index}>
            <button
              className={`option_btn ${selectedLevels.includes(type) ? 'selected' : ''}`}
              onClick={() => toggleTypes(type, selectedLevels, setSelectedLevels)}
            >
              {type}
            </button>
          </li>
        ))}
      </div>

      <h2>Monster/Spell/Trap Type</h2>
      <div className="card_type_section">
        {monsterSpellTrapTypes.map((type, index) => (
          <li key={index}>
            <button
              className={`option_btn ${selectedMonsterSpellTrapTypes.includes(type) ? 'selected' : ''}`}
              onClick={() => toggleTypes(type, selectedMonsterSpellTrapTypes, setSelectedMonsterSpellTrapTypes)}
            >
              {type}
            </button>
          </li>
        ))}
      </div>

      <div className='options_footer'>
        <button className='filter_btn clear_filter_btn' onClick={clearFilters}>Clear Filters</button>
        <Link to="/collection">
          <button className='filter_btn cancel_btn' onClick={clearFilters}>Cancel</button>
        </Link>
        <Link to="/collection" state={{ selectedTypes, selectedAttributes, selectedLevels, selectedMonsterSpellTrapTypes }}>
          <button className='filter_btn ok_btn'>Ok</button>
        </Link>
      </div>
    </div>
  );
};
