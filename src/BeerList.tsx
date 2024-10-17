import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Beer from './Beer';

interface BeerType {
    id: number;
    name: string;
}

interface BeerListProps {
}

class BeerList extends Component<BeerListProps> {
    state = {
        beers: [] as BeerType[],
        beerName: '',
        errorMessage: ''
    };

    componentDidMount() {
        // Récupérer les bières du localStorage au chargement de la page
        const storedBeers = localStorage.getItem('beers');
        if (storedBeers) {
            this.setState({beers: JSON.parse(storedBeers)});
        }
    }

    componentDidUpdate(prevProps: BeerListProps, prevState: { beers: BeerType[] }) {
        // Sauvegarder les bières dans localStorage lorsque la liste est mise à jour
        if (prevState.beers !== this.state.beers) {
            localStorage.setItem('beers', JSON.stringify(this.state.beers));
        }
    }

    addBeer = () => {
        const {beerName, beers} = this.state;

        if (beerName.trim() === '') {
            this.setState({errorMessage: 'Le nom de la bière ne peut pas être vide.'});
            return;
        }

        // Vérifier si une bière avec le même nom existe déjà
        const beerExists = beers.some(beer => beer.name.toLowerCase() === beerName.toLowerCase());
        if (beerExists) {
            this.setState({errorMessage: 'Une bière avec ce nom existe déjà.'});
            return;
        }

        const maxId = beers.length > 0 ? Math.max(...beers.map(beer => beer.id)) : 0;
        const newBeer: BeerType = {id: maxId + 1, name: beerName};
        this.setState({beers: [...beers, newBeer], beerName: '', errorMessage: ''});
    };

    removeBeer = (id: number) => {
        this.setState((prevState: { beers: BeerType[] }) => ({
            beers: prevState.beers.filter(beer => beer.id !== id)
        }));
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({beerName: '', errorMessage: ''});
        this.setState({beerName: e.target.value});
    };

    render() {
        const {beers, beerName, errorMessage} = this.state;

        return (
            <div>
                <h1>Liste des bières</h1>
                <input
                    type="text"
                    value={beerName}
                    onChange={this.handleInputChange}
                    placeholder="Nom de la bière"
                />
                <button onClick={this.addBeer}>Ajouter une bière</button>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                <ul>
                    {beers.map(beer => (
                        <li key={beer.id}>
                            <Link to={`/beer/${beer.id}`}>
                                <Beer id={beer.id} name={beer.name}/>
                            </Link>
                            <button onClick={() => this.removeBeer(beer.id)}>Supprimer {beer.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default BeerList;