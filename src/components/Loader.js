import Spinner from 'react-spinner-material';

export default function Loader(){
    return(
        <div style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15%',
            zIndex: '999'
        }}>
            <Spinner radius={60}
                color={'blue'}
                stroke={10}
                visible={true}
            />
            <h4>Loading..</h4>
        </div>
    )
}