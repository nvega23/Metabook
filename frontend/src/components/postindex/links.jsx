import "./links.css"
const PersonalLinks = () => {
    const openExternalSite = site => {
        window.open(site);
    };

    return (
        <>
            <div className="diva">
                <h3 className="contactText">Contact Me</h3>
                    <a className="contactButtons" target="_blank" href="https://github.com/nvega23">Github</a>
                    <a className="contactButtons" target="_blank" href="https://twitter.com/nvega24">Twitter</a>
                    <a className="contactButtons" target="_blank" href="https://www.linkedin.com/in/nestor-vega-233b43238/">Linkedin</a>
                    <a className="contactButtons" target="_blank" href="https://angel.co/u/nestorvega23">Wellfound</a>
                    {/* <button onClick={() => openExternalSite("mailto:vega.nestor1@gmail.com")}><a className="emailMe">Email The Developer</a></button> */}
            </div>
        </>
    )
};

export default PersonalLinks;
