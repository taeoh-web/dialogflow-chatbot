import React, { ReactNode } from 'react'


type Props = {
    sender?: string
    msg?: string
}

const Bubble = ({ sender, msg }: Props) => (
  <>
  <div className={`component-bubble ${sender}`}>
    {msg}
  </div>
  <style jsx>{`
        .component-bubble{
            margin:20px;
            padding:15px;
            max-width:60%;
            border-radius:5px;
            line-height:1.4em;
            clear:both;
            white-space: pre-wrap;
        }
        .component-bubble.user{background-color: #efefef; float:left}
        .component-bubble.bot{background-color: #a5d175; color: #fff; float:right; }
   `}</style>
  </>
)


export default Bubble