import React, {Component} from 'react';
import {useParams} from 'react-router-dom';

// Interface pour les props
interface BeerDetailsProps {
    id: number;
}

// Interface pour l'état
interface BeerDetailsState {
    beer: { id: number; name: string } | null;
}

// Composant fonctionnel pour récupérer l'ID avec `useParams`
function withParams(Component: React.ComponentType<BeerDetailsProps>) {
    return (props: any) => {
        const {id} = useParams<{ id: string }>(); // Récupérer l'ID en tant que string
        const beerId = parseInt(id ?? '', 10); // Convertir en nombre
        return <Component {...props} id={beerId}/>;
    };
}

// Composant de classe
class BeerDetails extends Component<BeerDetailsProps, BeerDetailsState> {
    constructor(props: BeerDetailsProps) {
        super(props);
        this.state = {
            beer: null
        };
    }

    componentDidMount() {
        const {id} = this.props;

        // Récupérer les bières depuis localStorage
        const storedBeers = localStorage.getItem('beers');
        const beers = storedBeers ? JSON.parse(storedBeers) : [];

        // Rechercher la bière correspondant à l'ID
        const beer = beers.find((b: { id: number }) => b.id === id);

        this.setState({beer});
    }

    render() {
        const {beer} = this.state;

        if (!beer) {
            return <p>Bière non trouvée.</p>;
        }

        return (
            <div>
                <h2>Détails de la bière</h2>
                <p>Id : {beer.id}</p>
                <p>Nom : {beer.name}</p>
            </div>
        );
    }
}

export default withParams(BeerDetails);