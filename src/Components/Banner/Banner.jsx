import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";


const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/8Mpvvmn/glenn-carstens-peters-RLw-UC03-Gwc-unsplash.jpg)' }}>
                <div className="hero-overlay bg-black bg-opacity-75"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="">
                        <h1 className="mb-5 text-5xl font-bold">Empower Your Productivity with TaskForge</h1>
                        <div className="mb-5">
                            <TypeAnimation
                                sequence={[
                                   
                                    'Elevate Your Efficiency Today!',
                                    1000,
                                    'Let the Magic of Productivity Begin!',
                                    1000,
                                    'Organize, Prioritize, Achieve.',
                                    1000,
                                    'Your Task, Your Rules, Your Success!',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{ fontSize: '2em', display: 'inline-block' }}
                                repeat={Infinity}
                            />
                        </div>
                        <Link to='/signin' className="btn btn-outline rounded-none border-white text-white hover:bg-blue-800 overflow-hidden transition-all hover:scale-105  hover:shadow-2xl">Let's Explore</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;