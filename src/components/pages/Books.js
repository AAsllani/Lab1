import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBooksModal} from './AddBooksModal';
import {EditBooksModal} from './EditBooksModal';

export class Books extends Component{

    constructor(props){
        super(props);
        this.state={Bookss:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Books')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Bookss:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteBooks(Booksid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Books/'+Booksid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {Bookss, Booksid,Booksname,cat,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>BooksId</th>
                        <th>BooksName</th>
                        <th>Category</th>
                        <th>DOJ</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Bookss.map(Books=>
                            <tr key={Books.BooksId}>
                                <td>{Books.BooksId}</td>
                                <td>{Books.BooksName}</td>
                                <td>{Books.Category}</td>
                                <td>{Books.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        Booksid:Books.BooksId,Booksname:Books.BooksName,cat:Books.Category,
        photofilename:Books.PhotoFileName,doj:Books.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteBooks(Books.BooksId)}>
            Delete
        </Button>

        <EditBooksModal show={this.state.editModalShow}
        onHide={editModalClose}
        Booksid={Booksid}
        Booksname={Booksname}
        bookst={Books}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Books</Button>

                    <AddBooksModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}