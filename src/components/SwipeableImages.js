

import {Carousel} from 'react-responsive-carousel';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../style/slide.css";

const  SwipeableImages =(props)=>{

  const imagesArray = props.images;
  const stylename = props.stylename;
  
  const theme = useTheme();
  let newImagesArray;

        return (
            <Carousel className={stylename} showStatus={false} thumbWidth={"50px"}   autoPlay>
            {imagesArray.map((pic,index)=>(
                <div key={index} >
                    <img className="img" src={pic.img}  />
             
                </div>
            ))

            }
            
            </Carousel>
        );
    

};

export default SwipeableImages;
