import React, { Component } from 'react';
import RoomsService from './RoomsService';

const roomsService = new RoomsService();

class RoomsCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          roomsService.getRoom(params.pk).then((r)=>{
            this.refs.nome.value = r.nome;
            this.refs.max_players.value = r.max_players;
            this.refs.criado_em.value = r.criado_em;
            this.refs.ativo.value = r.ativo;
          })
        }
      }

      handleCreate(){
        roomsService.createRoom(
          {
            "nome": this.refs.nome.value,
            "max_players": this.refs.max_players.value,
            "ativo": this.refs.ativo.value,
        }
        ).then((result)=>{
          alert("Sala Criada!");
        }).catch(()=>{
          alert('Algum dado está errado, verifique o form.');
        });
      }
      handleUpdate(pk){
        roomsService.updateRoomr(
          {
            "pk": pk,
            "nome": this.refs.nome.value,
            "max_players": this.refs.max_players.value,
            "ativo": this.refs.ativo.value,
        }
        ).then((result)=>{
          console.log(result);
          alert("Sala Atualizada !");
        }).catch(()=>{
          alert('Algum dado está errado, verifique o form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Nome:</label>
              <input className="form-control" type="text" ref='nome' />

            <label>
              Max Players:</label>
              <input className="form-control" type="text" ref='max_players'/>

            <label>
              Ativo:</label>
              <input className="form-control" type="text" ref='ativo' />


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default RoomsCreateUpdate;