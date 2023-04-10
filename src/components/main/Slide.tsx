import styled from "styled-components";
import banner1 from "../../assets/banner/banner1.svg";
import banner2 from "../../assets/banner/banner2.svg";
import Slider from "react-slick";

const Slide = () => {
  const settings = {
    infinite: true,
    arrows: false,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    cssEase: "linear",
    variableWidth: true,
  };

  return (
    <Wrapper>
      <StyledSlider {...settings}>
        <img src={banner1} alt="1" />
        <img src={banner2} alt="2" />
      </StyledSlider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
    margin-bottom: 40px;
`;

const StyledSlider = styled(Slider)`
  .slick-list{
    width: 1920px;
    height: 300px;
    margin-right: -408px;
    margin-bottom: 30px;
  }

  .slick-track{
    display: flex;
    justify-content: center;
    width: 1000px;
    height: 300px;

  }
`;

export default Slide;
