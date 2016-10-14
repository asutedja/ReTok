import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

const SuggestedFriends = (props) => {
  //inline CSS-style. fills the entire SuggestedFriends div with photo
    let pic = props.friend.profilePic || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAPFBMVEXl5+SXmZaUlpPo6ufh4+DP0c7b3dqRk5CjpaKfoZ7r7ere4N29v7zAwr+OkI2cnpupq6iytLHV19TIysevvj8CAAADjElEQVRoge2ay6KrMAhFjSTxXTX+/79eY21rq+YBRO/g7FFnqyAQQsiyP/3pvxdY3YHNMm3ULNNkV/4ByPQ0DkLkVkJUY6cv4kPTDWKBvjT/rlqTJaeD7Kot980Xo6kTk9ui2IOf9MdoEpoOpjww+UPvu3TwUbjQs4pBJqGDHDxka3qVwu+QBaCt3/nhoI+i+9Dvihse4vCX5dzwYLRNdc0KH8PRM7yUfGRQZwXlBD7yGd70Ueg53iYuOER5fFHF5HXQcR5fDG+ZDI83W4hec5DBxJPncOMxPCK1Nyo4vniDITOFeosyW4iBjs6c7YJLioyWWHRObmKgi0/ulT2Q2ZjkfqqnRrocsGiRGyJbxx4jGzY1y1BFbWUTSxtMBDbxFIeOwCZWF8BWNcsu72OLisau8elNZt9pN+l7U2ONkmPUgq4IbGrbdGdNpZwl1OaBcoY2VPaE7x2I6NnpWLM5OnS006mtQ/z99y2OHlmWKDTL3aDGldWCGuWLom/+VkyjB2gxX5weaYsQacaQ3E8hmraCb7oYG+psZtscjw11lonHCo8rbpzztVlVDJx8gn0pqnfim+yt8PYR7HHyxXsHDx438YzWviQDBy/cHrcKnPExpvYWHtIvp0HbYPd7ved9M9jCfSca/0PNB+4Jdv702rA7Dzvho6R39MPUMRyqcZ+mnA9EO9XOD54qwVa28zDNx5TP7+7RbpEy1Dy3lITZbWVcR+kjLbtxsvlPz3A2a6+0k77P7jvj3P1Ql7S2eNuHBP3SCy191+E+zX6LRXvbxbxMtFyjAzrVvEzRNNWqD1uumZh32QB0+ILLwLjLNtuhxiCjV7gYFcsiH9SZ6crQhaIXvSg7k9UkPEAzWywiyQs9F/2oGrT1UOv2cEEwmF+1GmU8SDUQwC98qaIzHuQU+5FP6VMUHUBV2Ln5Ab6awj0PCr3kcEIvA7spkC2Lt7/geRvk+LDaGU0Xkx9NeYV00z2mBxyTeBXOA9azeEuVa3sVdNT4EAM/O93B+HZ+6XBxbHlQX0KGn/Q1F6BtX3PEpqwXxMDHvccJL92R8H19TRziG/bvHkTIzJAN/nt7wW1E4tg/1zZ9HXqGf92V8U/sKPb3XfmiBFvZX06X1YXon2cNwoocSptI982HubVd03aPSfmVD5/hZ43f3sGp37CDH96Y9PiwnRO7JOz3FBDMlZXF6vM2j95hwbOXJPsHHK0uVxYc5/8AAAAASUVORK5CYII="
    const divStyle = {
      backgroundImage: 'url(' + pic + ')',
      backgroundPosition:'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }
  return (
    <div className = "oneFriend" style={divStyle}>
        <button className="videoButton" onClick={(e)=>{e.preventDefault;props.videoChat(props.friend);}}>Video Chat</button>
          <div className="oneFriendWrapper">
          </div>
      </div>
  )
}

export default SuggestedFriends
