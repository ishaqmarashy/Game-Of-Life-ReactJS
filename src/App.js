import './App.css';
import React from 'react';
const row =48;
const col =110;
const speed =100;
const neighbors = [[1, 1],[-1, 1],[1, -1], [-1, -1],[1, 0],[-1, 0],[0, 1],[0, -1]];

class Grid extends React.Component {
  constructor(props) {    
    super(props);    
    
    this.state = {      
      cells:this.generateEmptyGrid(props.row,props.col)  ,
      running:false,
      row:props.row,
      col:props.col,
      age:0,  
      speed: props.speed? props.speed: 100
    };
    this.startstop = this.startstop.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.run = this.run.bind(this);
    this.rand = this.rand.bind(this);
    this.reset = this.reset.bind(this);
  }

  toggleCell(e){
    let x=e.target.getAttribute('x')
    let y=e.target.getAttribute('y')
    let ar=this.state.cells
    ar[x][y]=ar[x][y]===0?1:0
    this.setState({cells:ar})
  }

  rand(){
    this.setState({cells: this.generateRandomGrid(this.state.row,this.state.col),age:0})
  }

  reset(){
    this.setState({cells: this.generateEmptyGrid(this.state.row,this.state.col),age:0})
    if(this.state.running)
      this.startstop()
  }
  run(){
    let ar=[]
    let old=this.state.cells
    for (var i = 0; i < old.length; i++)
      ar[i] = old[i].slice();
    for(let x=0; x<row; x++){
      for(let y=0; y<col; y++){
        let count=0
        for (let n=0; n<neighbors.length; n++){
          let yindx= neighbors[n][1]+y
          let xindx= neighbors[n][0]+x
          if(xindx>-1&&yindx>-1&&xindx<row&&yindx<col&&old[xindx][yindx]>0 )
            count+=1
        }
      
        if(count<2||3<count)
          ar[x][y]=0
        //acts like a live cell but could be 1 - 3 i can use this for css colors
        else if (count===3&&old[x][y]===0)
          ar[x][y]=1
        // else if (old[x][y]>0)
        //   ar[x][y]=count
        
      }
    }
    this.setState({cells:ar , age:this.state.age+1})

  }



  startstop(){
    if(!this.state.running){
      this.intervalID=setInterval(()=>this.run(),this.state.speed)
    }
    else{
      clearInterval(this.intervalID)
    }
    this.setState({running:!this.state.running})
  }

  generateRandomGrid = (row,col) => {
    const rows = [];
    for (let y = 0; y < row; y++) {
      const cols = [];
      for (let x = 0; x < col; x++) {
        let rand=Math.floor(Math.random()*1.2);
        cols.push(rand);
      }
      rows.push(cols)
    }
    return rows;
  };

  generateEmptyGrid = (row,col) => {
    const rows = [];
    for (let y = 0; y < row; y++) {
      const cols = [];
      for (let x = 0; x < col; x++) {
        cols.push(0);
      }
      rows.push(cols)
    }
    return rows;
  };
  
 
  render (){
    return (<>
            <div className="buttons_container" key="buttons_container">
            <button key='btn1' className={this.state.running? 'start': 'stop'} onClick={this.startstop}>Generation: {this.state.age}</button>
            <button key='btn2' className={this.state.running? 'stop':'start'} onClick={this.rand}>Randomize</button>
            <button key='btn3' className={this.state.running? 'stop':'start'} onClick={this.reset}>Clear</button>
            </div>
            <div>
            <div className='displayblock' key='displayblock'>
            {
              
                this.state.cells.map((rows,x)=> 
                   <div className='button_row' key={'button_row'+x}>
                     
                        {
                        rows.map((v,y)=><button x={x} y={y} key={y +','+ x} className={'cell'+v} onClick={this.toggleCell} >.</button>)
                        }
                    </div>)
           }</div>
            </div>
            </>
      )
  }
}

function App() {
    return (
    <div className="App" key='appdiv'>
        <Grid row={row} col={col} speed={speed} />    
    </div>
  );
}

export default App;
