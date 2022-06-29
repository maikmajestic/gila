import "./App.css";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {
  Box,
  Dialog,
  DialogTitle,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [open, setOpen] = React.useState(false);
  const [setSelectedValue] = React.useState();
  const [figuresList, setFiguresList] = React.useState([]);

  function AddingFigurePopup(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleItemClick = (value) => {
      let figures = figuresList;
      let id = Math.floor((Math.random()*10000) + 1);
      figures.push({ id, type: value });
      setFiguresList(figures);
      onClose(value);
    };

    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
        <DialogTitle>Select Figure</DialogTitle>
        <Stack direction="row" spacing={2}>
          <img
            width="20%"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/1024px-Regular_triangle.svg.png"
            alt="triangle"
            onClick={() => handleItemClick("triangle")}
          />
          <img
            width="20%"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png"
            alt="square"
            onClick={() => handleItemClick("square")}
          />
          <img
            width="20%"
            src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Black_Circle.svg"
            alt="circle"
            onClick={() => handleItemClick("circle")}
          />
        </Stack>
      </Dialog>
    );
  }

  useEffect(() => {
    let figures = figuresList;
    setFiguresList(figures);
  }, [figuresList]);

  AddingFigurePopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleDelete = (id) => {
    let figures = figuresList;
    figures = figures.filter(figure => figure.id !== id);
    setFiguresList(figures);
  };

  const selectFigure = (id, figure) => {
    switch (figure) {
      case "triangle":
        return (
          <img
            width="100%"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/1024px-Regular_triangle.svg.png"
            key={id}
            alt="triangle"
          />
        );
      case "square":
        return (
          <img
            width="100%"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/800px-Square_-_black_simple.svg.png"
            key={id}
            alt="square"
          />
        );
      case "circle":
        return (
          <img
            width="100%"
            src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Black_Circle.svg"
            key={id}
            alt="circle"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administrador de Figuras
          </Typography>
        </Toolbar>
      </AppBar>

      <Box direction="row" spacing={2} className="box">
        {figuresList.map((figure) => {
          return ( 
            <div key={figure.id} className="figure">
              {selectFigure(figure.id, figure.type)}
              <IconButton aria-label="delete" className="delete" onClick={() => handleDelete(figure.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </Box>

      <IconButton
        color="primary"
        aria-label="Add figure"
        size="large"
        onClick={handleClickOpen}
      >
        <AddCircleIcon/>
      </IconButton>
      <AddingFigurePopup open={open} onClose={handleClose} />
    </Box>
  );
}

export default App;
