import React, { Component } from 'react';
import RoomsService from './RoomsService';
import RoomCreateUpdate from './RoomCreateUpdate';


const roomsService = new RoomsService();

class RoomsList extends Component {

constructor(props) {
    super(props);
    this.state  = {
        rooms: [],
        nextPageURL:  ''
    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
}

componentDidMount() {
    roomsService.getRooms().then((result) => {
        console.log(result);
        this.setState({ rooms:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete= (id) => {
    roomsService.deleteRoom({id :  id}).then(()=>{
        var newArr = this.state.rooms.filter(function(obj) {
            return obj.id !== id;
        });

        this.setState({rooms:  newArr})
    });
}

nextPage(){
    console.log(this.state.nextPageURL);
    roomsService.getRoomsByURL(this.state.nextPageURL).then((result) => {
        this.setState({ rooms:  result.data, nextPageURL:  result.nextlink})
    });
}

render() {

    return (
        <div  className="customers--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Max Players</th>
                <th>Criado em</th>
                <th>Ativo</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.rooms.map( (r)  =>
                <tr  key={r.id}>
                <td>{r.id}  </td>
                <td>{r.nome}</td>
                <td>{r.max_players}</td>
                <td>{r.criado_em}</td>
                <td>{r.ativo}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(r.id) }> Excluir</button>
                <a  href={"/rooms/" + r.id}> Atualizar</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick={this.nextPage}>Proxima</button>
            
            
            
        </div>
        );
  }
}
export default RoomsList;