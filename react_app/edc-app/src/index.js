import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HttpService from './service/http-Service'

const http=new HttpService();

function Nav(props){
    
  
    return (
        
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">Navbar</a>
      <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={props.onClick}>Search</button>
      </form>
    </nav>    
    );
  
}

function BtnGroup(props){
    
  
    return (
        
    <div className="row">
        <div className="col-sm-12">
          <div className="btn-group float-right" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-link" onClick={props.onExport}>Export</button>
              <button type="button" className="btn btn-link" onClick={props.onImport}>Import</button>
              <button type="button" className="btn btn-link" onClick={props.onSave}>Save</button>
            </div>
          </div>
      </div>   
    );
  
}

function Application(props){
  
    return (
        
            <tr>
                  <th scope="row">{props.id}</th>
                  <td>{props.name}</td>
                  <td>{props.crn}</td>
                  <td><input type="text" value={props.consumption}/></td>
             </tr>  
    );
  
}

class Grid extends React.Component {
    
    /*constructor(props){
        this.renderApplications = this.renderApplications.bind(this);
    }*/
    
  renderApplications() {  
      
    const rows = this.props.applications.map((application) => 
            <Application id={application.id} name={application.name} crn={application.crn} 
                                             consumption={application.consumption}/>  
        );
        
        return (rows);

  }
  
  render() {
    return (
        <div className="row">
        <div className="col-sm-12">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">CRN</th>
                  <th scope="col">Consumption</th>
                </tr>
              </thead>
              <tbody>
                {this.renderApplications()}
              </tbody>
            </table>
            
        </div>
      </div>
        
    );
  }
}

class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
          applications:[{}],
          page: 0,
          index: 0
      }
      
      this.loadData = this.loadData.bind(this);
        //this.productList = this.productList.bind(this);
        //call function
        this.loadData();
  }
    
   loadData = () => {
        var self=this;
        http.getOutput().then(data => {
            console.log(data);
            self.setState({applications:data});
        }, err => {
            console.log(err);
            alert(err);
        });
    }
    
   
   onNext(){
       //this.state.page+=1;
       //this.state.index+=4;
       
       this.setState({
          applications: this.state.applications, 
          page: this.state.page+=1,
          index: this.state.index+=4
    });
       
   }

    onPrevious(){
       //this.state.page+=1;
       //this.state.index+=4;
       
       this.setState({
          applications: this.state.applications, 
          page: this.state.page-=1,
          index: this.state.index-=4
    });
       
   }

    onPage(i){
       //this.state.page+=1;
       //this.state.index+=4;
       //var pagenum= parseInt(i);
        var pagenum= i;
        
       this.setState({
          applications: this.state.applications, 
          page: pagenum,
          index: pagenum*4
    });
        
       // alert('index'+this.state.index);
        //alert('page'+this.state.page);
       
   }
   
    handleSearch(){
    }
    
    
    render() {
        
        var previous,next,pages;
        var arr;
        
        //setting previous
        if(this.state.page !=0)
        {
            previous=(
                
                        <li class="page-item">
                          <a class="page-link" href="#" onClick={() => this.onPrevious()}>Previous</a>
                        </li>
                        
            );    
        }

        //setting next
        if( (this.state.index+4) < (this.state.applications.length-1) ){
            next=(
                
                        <li class="page-item">
                          <a class="page-link" href="#" onClick={() => this.onNext()}>Next</a>
                        </li>
                      
            );    
        }
        
        //setting display pages
        pages=new Array(this.state.applications.length%4).fill(0);
        var i;
        /*for(i=0;i<(this.state.applications.length%4);i++){
            if(this.state.page==i)
                pages.push(<li class="page-item disabled"><a class="page-link" href="#" aria-disabled="true">{i+1}</a></li>);
            else
                pages.push(<li class="page-item"><a class="page-link" href="#" onClick={() => this.onPage(''+i)}>{i+1}</a></li>);
        }*/
        
        //setting array
        if(this.state.applications.length>0)
            {
                arr=this.state.applications.slice(this.state.index,this.state.index+4);
            }
        else{
            arr=this.state.applications;
        }
        
        
        return (
            <React.Fragment>
          <Nav onClick={() => this.handleSearch()}/>
            <div className="container">
                <BtnGroup onExport="" onImport="" onSave="" />
                <Grid applications={arr} /> 
                <div class="row">
                <div class="col-sm-12">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-center">  
                        {previous}
                        {pages.map((item,i) => 
                                  
                                   {if(this.state.page==i) 
                                     return <li class="page-item disabled"><a class="page-link" href="#" aria-disabled="true">{i+1}</a></li>
                                        else 
                                     return <li class="page-item"><a class="page-link" href="#" onClick={() => this.onPage(i)}>{i+1}</a></li> 
                                   }
                                  )}
                        {next}
                    </ul>
                    </nav>
                </div>
                </div>      
            </div>
            </React.Fragment>
        );
  }
}

function Square(props){
    
  
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  
}

class Board extends React.Component {
    
  renderSquare(i) {  
    return (
        <Square value={this.props.squares[i]} 
            onClick={()=> this.props.onClick(i)}/>
    );
  }
  
  loadData = () => {
        var self=this;
        http.getOutput().then(data => {
            console.log(data);
            //self.setState({products:data});
        }, err => {
            console.log(err);
        });
    }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
      super(props);
      this.state={
          history:[{
              squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          XIsNext: true,
      }
  }
    
    jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
    
    handleClick(i){
        const history=this.state.history;
        const current=history[history.length-1];
        const squares=current.squares.slice();
        
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        
        squares[i]=this.state.XIsNext ? 'X':'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            XIsNext: !this.state.XIsNext,});
    }
    
    
    render() {
        const history=this.state.history;
        const current = history[this.state.stepNumber];
        const winner= calculateWinner(current.squares);
        
        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
      
        let status;
      if(winner){
          status = 'Winner: '+winner;
      }
      else{
        status='Next Player: '+(this.state.XIsNext ? 'X':'O');
      }
        
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  //<Game />,
    <App />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}