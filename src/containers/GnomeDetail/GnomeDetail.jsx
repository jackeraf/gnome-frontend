import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import './GnomeDetail.css'

export class UnConnectedGnomeDetail extends Component {

    componentDidMount(){
        if(this.props.gnomeList.length === 0){
            return this.props.getGnomes()
            .then(()=>this.props.updateGnomeId(this.props.match.params.id));
        }
    }
    render(){
        if(this.props.gnomeList.length !== 0){
            const gnome = this.props.gnomeList.find(gnome => gnome.id === +this.props.match.params.id);
            return (
                <div className="container">
                    <h1>GnomeDetail</h1>
                    <h3><span>Name:</span> {gnome.name}</h3>
                    <div className="row">
                        <img className="img-fluid img-thumbnail" src={gnome.thumbnail} alt={gnome.name}/>
                        <ul>
                            <p>Age: {gnome.age}</p>
                            <p>Weight: {gnome.weight}</p>
                            <p>Height: {gnome.height}</p>
                            <p>Hair Color: {gnome.hair_color}</p>
                        </ul>
                    </div>
                    <div className="row">
                        <ul>
                            <h2>Professions</h2> 
                            {gnome.professions.map((profession, index)=> <li key={index}>{profession}</li>)}
                        </ul>
                    </div>
                   
                    <div className="row">
                        <ul>
                            <h2>Friends</h2> 
                            {gnome.friends.map((friend, index)=> <li key={index}>{friend}</li>)}
                        </ul>
                    </div>
                   
                </div>
            );
        }
        return null;
    }
    
}

const mapStateToProps = state=>{
    const gnomeList = state.gnomeList.length !== 0 ? state.gnomeList : [];
    
    return{
        gnomeList
    }
}

const mapDispatchToProps = dispatch =>{

    return{
        getGnomes: ()=>dispatch(actions.getGnomes()),
        updateGnomeId: id=>dispatch(actions.updateGnomeId(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnConnectedGnomeDetail);