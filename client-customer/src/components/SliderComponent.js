import axios from "axios";
import React, { Component } from "react";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.apiGetSliders();
  }

  apiGetSliders() {
    axios
      .get("/api/customer/products/new")
      .then((res) => {
        const result = res.data;
        this.setState({ images: result });
      })
      .catch((error) => {
        console.error("There was an error fetching the images!", error);
      });
  }

  render() {
    const { images } = this.state;

    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    return (
      <SlickSlider {...settings}>
        {images.map((item) => (
          <img
            key={item._id}
            src={`data:image/jpg;base64,${item.image}`}
            height="300px"
            alt=""
          />
        ))}
      </SlickSlider>
    );
  }
}

export default Slider;
