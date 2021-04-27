import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test, confirm render
it("renders without crashing", function () {
  render(<Carousel />);
});

//check code against what we expect it to be
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // move forward in the carousel
  fireEvent.click(rightArrow);

  //move back in the carousel
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("hides left arrow at start and right arrow at end", function () {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  //left arrow should have class hidden, right should be normal
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  //advance carousel one, both arrows should be on page
  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  //advance Carousel a third time, left arrow should be hidden
  //but right arrow should be visable
  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});
