import Banner from "../assets/images/banner.avif"

const Home = () => {
  return <>
  <h3 className="text-center main__heading"> Welcome to Blinkit</h3>
  <div style={{height: "90vh", backgroundImage: `url(${Banner})` }}></div>
  </>
};

export default Home;