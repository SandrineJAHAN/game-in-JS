var app = {

  direction: null,
  start: {
    col: 1,
    row: 1
  },
  end: {
    col: 6,
    row: 4
  },
  current: null,
  nbCols: 6,
  nbRows: 4,

  init: function () {
    console.log('init');
    app.current = {
      col: app.start.col,
      row: app.start.row
    };
    app.direction = 'right';
    app.drawBoard();
    const button = document.getElementById("launchScript").addEventListener("click", app.handleLaunchScriptButton);

  },
  moveForward: function () {
    switch (app.direction) {
      case 'right':
        app.current.col++;
        break;
      case 'bottom':
        app.current.row++;
        break;
      case 'left':
        app.current.col--;
        break;
      case 'top':
        app.current.row--;
        break;
    }

    if (app.current.row < 1) {
      app.current.row = 1;
      console.log('out 1');
      return false;
    } else if (app.current.row > app.nbRows) {
      app.current.row = app.nbRows;
      console.log('out 2');
      return false;
    } else if (app.current.col < 1) {
      app.current.col = 1;
      console.log('out 3');
      return false;
    } else if (app.current.col > app.nbCols) {
      app.current.col = app.nbCols;
      console.log('out 4');
      return false;
    }

  },

  drawBoard: function (e) {
    // selection de la divBoard
    const divBoard = document.getElementById('board');
    divBoard.innerHTML = '';

    var row;
    var cell;

    for (let i = 1; i <= app.nbRows; i++) {

      row = document.createElement('div');
      row.classList.add('cellRow');
      row.setAttribute('id', 'row' + i);

      for (let j = 1; j <= app.nbCols; j++) {
        cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', 'cell' + j);

        if (app.start.row == i && app.start.col == j) {
          cell.classList.add('cellStart');
        }

        if (app.end.row == i && app.end.col == j) {
          cell.classList.add('cellEnd');
        }

        if (app.current.row == i && app.current.col == j) {
          cell.classList.add('cellCurrent');
          cell.classList.add('cellCurrent-' + app.direction);
        }

        row.appendChild(cell);
      }

      divBoard.appendChild(row);
    }

  },
  turnLeft: function() {
    switch (app.direction) {
      case 'top':
        app.direction = 'left';
        break;
      case 'left':
        app.direction = 'bottom';
        break;
      case 'bottom':
        app.direction = 'right';
        break;
      case 'right':
        app.direction = 'top';
        break;
    }
  },
  turnRight: function() {
    switch (app.direction) {
      case 'top':
        app.direction = 'right';
        break;
      case 'right':
        app.direction = 'bottom';
        break;
      case 'bottom':
        app.direction = 'left';
        break;
      case 'left':
        app.direction = 'top';
        break;
    }
  },


  handleLaunchScriptButton: function () {
   

    app.drawBoard();

    console.log('entrée sur le bouton');
    // recuperation de la valeur du textArea
    const textArea = document.getElementById('userCode').value;
    console.log(textArea);
    //transformer le string en tableau
    var reg = new RegExp("[ ,;]+", "g");
    var codeLines=textArea.split(reg);
    //console.table(codeLines);

   

    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  executeLine: function(line) {
    if (line == 'right') {
      app.turnRight();
      console.log(app.direction);
    } else if (line == 'left') {
      app.turnLeft();
      console.log('tourne à gauche');
    } else if (line == 'move') {
      app.moveForward();
      console.log('avance');
    }
    return true;
  },
  codeLineLoop: function (codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    app.executeLine(currentLine);
    app.drawBoard();

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function () {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function () {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function () {
     // if coordinates are ok
     if (app.current.row == app.end.row && app.current.col == app.end.col) {
      alert('You WIINNN !!! congratulations !');
    } else {
      alert('You dramatically failed !');
    }
   
  }
};

document.addEventListener('DOMContentLoaded', app.init);
