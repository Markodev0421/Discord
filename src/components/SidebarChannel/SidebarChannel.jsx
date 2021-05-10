import React, { useEffect, useState } from 'react'
import './SidebarChannel.scss'
import { firestore } from '../../firebase/firebase';
import Channelmap from './Channelmap';
import { useSelector } from 'react-redux';

const SidebarChannel=React.memo(()=>{
      const currentserverid=useSelector((state)=>state.currentserver.id)
      const channelRef=firestore.collection('servers').doc(currentserverid).collection('channels')
      const [channels,setchannels]=useState([]);
      useEffect(() => {
          let data=[]
          console.log('rendered due to channel change');
            const myfun=async()=>{
            await channelRef.orderBy('createdAt').get().then((snapshot)=>{
                snapshot.docs.map((doc)=>{
                    const mychannel=doc.data();
                    mychannel.id=doc.id
                    return data.push(mychannel)
                })
            })
            setchannels(data)
            }   
            myfun();    return () => {
              
          }
      }, [])
      console.log(channels);
    return (
        <div>
            <div className="sidebarchannel">
                {channels && channels.map((msg)=>{
                    return <Channelmap key={msg.id} msg={msg}/>
                })}               
            </div>
        </div>
    )
})

export default SidebarChannel