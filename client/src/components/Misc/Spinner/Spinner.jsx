function Spinner({ size = "default" }) {
    return ( 
        <div className={"spinner " + size}>
            <div />
            <div />
        </div>
     );
}

export default Spinner;