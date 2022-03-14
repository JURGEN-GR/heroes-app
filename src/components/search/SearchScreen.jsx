import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from 'query-string';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;
  const heroesFileted = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />
          <form autoComplete="off" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar un héroe"
              className="form-control"
              name="searchText"
              onChange={handleInputChange}
              value={searchText}
            />
            <button type="submit" className="btn btn-outline-primary mt-3">
              Buscar
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />
          {q === '' ? (
            <div className="alert alert-info">Busca un héroe</div>
          ) : (
            heroesFileted.length === 0 && (
              <div className="alert alert-danger">
                No hay resultados {searchText}
              </div>
            )
          )}
          {heroesFileted.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
