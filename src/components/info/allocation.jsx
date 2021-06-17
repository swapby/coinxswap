
export const Allocation = (props) => {
  return (
    <div className="container bg_fa" id="allocation">
            <div className="hero-title">
                <div className="title">
                    <h2>{props.data ? props.data.title : 'Loading'}</h2>
                    <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                    <div className="token_wrap">
                        <ul className="token_01">
                            <li><h1>{props.data ? props.data.TokenAllocation[0] : 'Loading'}</h1></li>
                            <li>
                              {props.data ? props.data.TokenAllocation[1] : 'Loading'}
                              <span>{props.data ? props.data.TokenAllocation[2] : 'Loading'}</span>
                            </li>
                            <li>
                              {props.data ? props.data.TokenAllocation[3] : 'Loading'}
                              <span>{props.data ? props.data.TokenAllocation[4] : 'Loading'}</span>
                            </li>
                            <li>
                              {props.data ? props.data.TokenAllocation[5] : 'Loading'}
                              <span>{props.data ? props.data.TokenAllocation[6] : 'Loading'}</span>
                            </li>
                            <li>
                              {props.data ? props.data.TokenAllocation[7] : 'Loading'}
                              <span>{props.data ? props.data.TokenAllocation[8] : 'Loading'}</span>
                            </li>
                            <li>
                              {props.data ? props.data.TokenAllocation[9] : 'Loading'}
                              <span>{props.data ? props.data.TokenAllocation[10] : 'Loading'}</span>
                            </li>
                            <li>
                              <hr/><br/>
                              {props.data ? props.data.TokenAllocation[11] : 'Loading'}
                              <span>{props.data ? props.data.TokenAllocation[12] : 'Loading'}</span>
                            </li>
                        </ul>
                        <ul className="token_02">
                            <li><h1>{props.data ? props.data.UseOfFund[0] : 'Loading'}</h1></li>
                            <li>
                              {props.data ? props.data.UseOfFund[1] : 'Loading'}
                              <span>{props.data ? props.data.UseOfFund[2] : 'Loading'}</span>
                            </li>
                            <li>
                              {props.data ? props.data.UseOfFund[3] : 'Loading'}
                              <span>{props.data ? props.data.UseOfFund[4] : 'Loading'}</span>
                            </li>
                            <li>
                              {props.data ? props.data.UseOfFund[5] : 'Loading'}
                              <span>{props.data ? props.data.UseOfFund[6] : 'Loading'}</span>
                            </li>
                            <li>
                              {props.data ? props.data.UseOfFund[7] : 'Loading'}
                              <span>{props.data ? props.data.UseOfFund[8] : 'Loading'}</span>
                            </li>
                            <li>
                            <hr/><br/>
                              {props.data ? props.data.UseOfFund[9] : 'Loading'}
                              <span>{props.data ? props.data.UseOfFund[10] : 'Loading'}</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
  )
}
