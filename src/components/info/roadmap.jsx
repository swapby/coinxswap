export const Roadmap = (props) => {
  return (
    <div className="container roadmap" id="roadmap">
        <div className="hero-title">
            <div className="title">
                <h2>{props.data ? props.data.title : 'Loading'}</h2>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <div className="roadmap_wrap">
                    <ul>
                        <li>
                          <p>{props.data ? props.data.roadmap20Q4[0] : 'Loading'}</p>
                          {props.data ? props.data.roadmap20Q4[1] : 'Loading'} 
                        </li>
                        <li>
                          <p>{props.data ? props.data.roadmap21Q1[0] : 'Loading'}</p>
                          {props.data ? props.data.roadmap21Q1[1] : 'Loading'}
                          <span>I</span>
                          {props.data ? props.data.roadmap21Q1[2] : 'Loading'}
                        </li>
                        <li>
                          <p>2021 Q2</p>
                          {props.data ? props.data.roadmap21Q2[0] : 'Loading'}
                          <span>I</span>
                          {props.data ? props.data.roadmap21Q2[1] : 'Loading'}
                        </li>
                        <li>
                          <p>{props.data ? props.data.roadmap21Q3[0] : 'Loading'}</p>
                          {props.data ? props.data.roadmap21Q3[1] : 'Loading'}
                          <span>I</span>
                          {props.data ? props.data.roadmap21Q3[2] : 'Loading'}
                        </li>
                        <li>
                          <p>{props.data ? props.data.roadmap21Q4[0] : 'Loading'}</p>
                          {props.data ? props.data.roadmap21Q4[1] : 'Loading'}
                          <span>I</span>
                          {props.data ? props.data.roadmap21Q4[2] : 'Loading'}
                        </li>
                        <li>
                          <p>{props.data ? props.data.roadmap22Q1[0] : 'Loading'}</p>
                          {props.data ? props.data.roadmap22Q1[1] : 'Loading'}
                          <span>I</span>
                          {props.data ? props.data.roadmap22Q1[2] : 'Loading'}
                        </li>
                        <li>
                          <p>{props.data ? props.data.roadmap22Q2[0] : 'Loading'}</p>
                          {props.data ? props.data.roadmap22Q2[1] : 'Loading'}
                        </li>
                    </ul>
                </div>
                <div className="roadmap_footer">
                  {props.data ? props.data.footer[0] : 'Loading'}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {props.data ? props.data.footer[1] : 'Loading'}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {props.data ? props.data.footer[2] : 'Loading'}
                </div>
            </div>
        </div>
    </div>
    
  )
}
