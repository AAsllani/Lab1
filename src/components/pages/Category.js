import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCatModal} from './AddCatModal';
import {EditCatModal} from './EditCatModal';

export class Category extends Component{

    constructor(props){
        super(props);
        this.state={Cats:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Cats:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCat(Catid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Category/'+Catid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {Cats, Catid,Catname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CategoryId</th>
                        <th>CategoryName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cats.map(Cat=>
                            <tr key={Cat.CategoryId}>
                                <td>{Cat.CategoryId}</td>
                                <td>{Cat.CategoryName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        Catid:Cat.CategoryId,Catname:Cat.CategoryName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCat(Cat.CategoryId)}>
            Delete
        </Button>

        <EditCatModal show={this.state.editModalShow}
        onHide={editModalClose}
        Catid={Catid}
        Catname={Catname}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Category</Button>

                    <AddCatModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}