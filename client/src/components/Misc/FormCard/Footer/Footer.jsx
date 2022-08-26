function Footer({data}) {
    return ( 
        <div className="gray flex-col center">
            <h2>{data.text}{data.link}</h2>
        </div>
     );
}

export default Footer;