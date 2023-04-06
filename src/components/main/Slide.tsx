import styled from "styled-components";
import banner1 from "../../assets/banner/banner1.svg";
import banner2 from "../../assets/banner/banner2.svg";
import Slider from "react-slick";

const Slide = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div>
      <StyledSlider {...settings}>
        <img src={banner1} alt="1" />
        <img src={banner2} alt="2" />
      </StyledSlider>
    </div>
  );
};

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
    margin-bottom: 40px;
`;

const StyledSlider = styled(Slider)`
> img{
    width: 800px;
    height: 300px;
}

  > div {
    margin: 0 60px;
  }

  .slick-list{
    display: flex;
    justify-content: center;
    width: 1200px;
    height: 300px;
  }
`;

export default Slide;
