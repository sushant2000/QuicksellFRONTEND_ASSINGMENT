import React, { Fragment } from 'react'
import add from '../Assets/add.svg'
import dotMenu from '../Assets/3 dot menu.svg'
import avatar from '../Assets/profilepic.jpg'
import highpriority from '../Assets/Img - High Priority.svg'
import lowpriority from '../Assets/Img - Low Priority.svg'
import mediumpriority from '../Assets/Img - Medium Priority.svg'
import inprogress from '../Assets/in-progress.svg'
import noPriority from '../Assets/No-priority.svg'
import urgentPrioritygrey from '../Assets/SVG - Urgent Priority grey.svg'
import urgentPrioritycolour from '../Assets/SVG - Urgent Priority colour.svg'
import Todo from '../Assets/To-do.svg'
import backLog from '../Assets/Backlog.svg'


const Header = ({ data }) => {
    const arr = data?.resarr;
    const metaData = data?.userMetaData;
    const APIdata = data?.APIdata;
    const groupingBases = data?.grouped;
    // console.log(groupingBases)
    var keys = [];
    var userids = [];
    var usernames = [];
    var imagesPriority = [noPriority, lowpriority, mediumpriority, highpriority, urgentPrioritycolour];
    var imagesStatus = { 'Todo': Todo, 'In progress': inprogress, 'Backlog': backLog };

    var priority = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
    arr && Object.keys(arr).forEach((element) => { keys.push(element) });
    metaData && Object.keys(metaData).forEach((element) => { userids.push(element) });
    metaData && Object.values(metaData).forEach((element) => { usernames.push(element[0].name); });
    // console.log(arr)
    // console.log(metaData)
    // console.log(usernames)
    // console.log(APIdata)
    // console.log(keys);
    // console.log(userids)
    return (
        <div className='header'>
            {arr && Object.values(arr).map((elemArr, indx) => {
                return <Fragment key={userids[indx]}>
                    <div className='card-layout' id='card-grouping' >

                        <div className='title-info'>
                            <div className='profile-info'>
                                <div className='avatar'>
                                    <img src={
                                        (groupingBases === 'Priority') ? imagesPriority[keys[indx]] : ((groupingBases === 'User') ? avatar : imagesStatus[keys[indx]])
                                    } alt='Avatar' />
                                </div>
                                <div>
                                    <p ><strong style={{fontSize:15,fontFamily:'Arial'}}>{
                                        (groupingBases === 'Priority') ? priority[keys[indx]] : ((groupingBases === 'User') ? metaData[keys[indx]][0].name : keys[indx])
                                    }</strong></p>
                                </div>
                                <div style={{fontSize:14,fontFamily:'Arial'}}>{arr[keys[indx]].length}</div>
                            </div>
                            <div className='controls'>
                                <div>
                                    <img src={add} alt='logo' className='add-logo' />
                                </div>
                                <div>
                                    <img src={dotMenu} alt='logo' className='add-logo' />
                                </div>
                            </div>
                        </div>
                        {<div id='card-grouping'>
                            {
                                elemArr.map((Itemindx) => {
                                    const data = APIdata[0].tickets[Itemindx];
                                    return <div className='card' key={data?.id} style={{ borderRadius: 8 , boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'}}>
                                        <div className='inner-card-first'>
                                            <div className='card-meta-data'>
                                                <h5 style={{fontFamily:'Arial',fontSize:15}}>{data?.id}</h5>
                                                <div className='card-title' style={{fontWeight:'bold',fontSize:15,fontFamily:'Arial',display: 'flex',}}>
                                                    {
                                                        (groupingBases !== 'Status') && <img src={imagesStatus[data?.status]} alt='logo' />
                                                    }
                                                        <p style={{ margin: 0 }}>{data?.title}</p>
                                                    
                                                </div>
                                            </div>

                                            {(groupingBases!=='User')&&<div className='avatar card-avatar' style={{marginTop:-65}}
                                            >
                                                <img  src={avatar} alt='Avatar' />
                                                <div className={APIdata[0].users[Itemindx]?.available ? 'online' : 'offline'}></div>
                                            </div>}
                                        </div>
                                        <div  className style={{ display: 'flex', alignItems: 'center' }}>
                                            {(groupingBases !== 'Priority') && <img className='featured-wrapper' src={imagesPriority[data?.priority]} alt='logo' />}
                                            {
                                                (data?.tag[0]) && <div className='featured-wrapper' style={{ display: 'flex', alignItems: 'center',marginLeft:5 }}>
                                                    <div className='featured' style={{fontFamily:'Arial',fontSize:20}}></div>
                                                    {/* <p >{data?.tag[0]}</p> */}
                                                    <p style={{ marginLeft: 5, fontFamily: 'Arial', fontSize: 15 }}>{data?.tag[0]}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                })
                            }

                        </div>}

                    </div>
                </Fragment>


            })}
        </div>)

}
export default Header