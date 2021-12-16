import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function() {
  render(<Carousel />);
});


// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


// test that allows to catch a left arrow bug
it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move to the second image in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // check that we are on the second image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

});


// Tests to check that the left arrow is missing when you’re on the first image, 
// and that the right arrow is missing when you’re on the last image in the carousel.

it("right arrow is missing if you are on the last image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  
  // move to the third image in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  
  // check that we are on the third image in the carousel
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();

  // check that right arrow is missing
  expect(rightArrow).not.toBeInTheDocument();

});


it("left arrow is missing if you are on the first image", function() {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");

  // check that left arrow is missing
  expect(leftArrow).not.toBeInTheDocument();

});