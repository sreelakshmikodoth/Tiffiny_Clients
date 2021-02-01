import React, { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";

//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Spinner from "../util/spinner/spinner";
import RestaurantItems from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import { fetchRestaurant } from "../redux/actions/dataActions";

export default function Restaurant(props) {
  const restId = props.location.state.restId;
  const { loading } = useSelector((state) => state.data);
  const restaurant = useSelector((state) => state.data.restaurant);
  const { items } = useSelector((state) => state.data.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items) {
      setItemsState(items);
      setFilteredItemsState(items);
    }
  }, [items]);

  const [itemsState, setItemsState] = useState(items ? [] : null);
  const [filteredItemsState, setFilteredItemsState] = useState(
    items ? [] : null
  );

  const handleSearch = (value) => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (value !== "") {
      // Assign the original list to currentList
      currentList = itemsState;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter((item) => {
        // change current item to lowercase
        const lc = item.title.toLowerCase();
        // change search term to lowercase
        const filter = value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = itemsState;
    }
    // Set the filtered state based on what our rules added to newList
    setFilteredItemsState(newList);
  };

  useEffect(() => {
    dispatch(fetchRestaurant(restId));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
         
          <Typography
                gutterBottom
                variant="h5"
                noWrap
                style={{ textAlign: "center" , marginTop: 40 }}
              >
              {restaurant.name}
               </Typography>
          <Grid container direction="row" style={{ marginTop: 20 }}>
          
          <Grid item xs={2} sm={2}/>
            <Grid
              item
              xs={8}
              sm={8}
              style={{ marginTop: 20,marginBottom:40}}
            >
              <SearchBar page="items" handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={2} sm={2}/>

            <Grid
              item
              xs={12}
              sm={12}
            
            >
              <Typography
                gutterBottom
                variant="h5"
                noWrap
                style={{ textAlign: "center" }}
              >
                Why starve when you have us&nbsp;&nbsp;
                <span role="img" aria-label="fries" style={{ fontSize: 40 }}>
                  🍟
                </span>
              </Typography>
              <Typography
                variant="body1"
                noWrap
                style={{ textAlign: "center" }}
              >
                Order from wide varieties of different available Items below
              </Typography>
              <br />
            </Grid>
          
            <RestaurantItems items={filteredItemsState} />
          </Grid>
        </>
      )}
    </>
  );
}
