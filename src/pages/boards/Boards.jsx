import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "../../themes/Theme";

const Boards = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          color: theme.palette.secondary.main,
        }}
      >
        Boards
      </Typography>
    </Box>
  );
};

export default Boards;
