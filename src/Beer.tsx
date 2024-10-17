import React, {Component} from 'react';

// Define the type for props
interface BeerProps {
    id: number;
    name: string;
}

class Beer extends Component<BeerProps> {

    render() {
        return this.props.id + " - " + this.props.name;
    }
}

export default Beer;