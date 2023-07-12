import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#33030d",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="#e3c5cc">
              We are Imanda company, dedicated to providing the best service to
              our customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="#e3c5cc">
              Gongabu, Kathmandu
            </Typography>
            <Typography variant="body2" color="#e3c5cc">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="#e3c5cc">
              Phone: +977 9803708637
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Follow Us
            </Typography>
            <Link href="" color="inherit">
              <Facebook />
            </Link>
            <Link href="" color="inherit" sx={{ pl: 1, pr: 1 }}>
              <Instagram />
            </Link>
            <Link href="" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center" color={"white"}>
            {"Copyright © "}
            <Link color="inherit" href="">
              Imanda Company
            </Link>
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
