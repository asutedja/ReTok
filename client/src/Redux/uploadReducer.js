// actions to be dispatched to reducer for uploadReducer === //

export function handleImageChange(file, imagePreviewUrl){
  return {
    type: 'HANDLE_IMAGE_CHANGE',
    file,
    imagePreviewUrl,
  }
}

//====== initial state for image container ====== //

const imageUploadInitialState = {
  file: '',
  imagePreviewUrl: '',
}

//========= reducer to connect to container component ====//

export default function uploadReducer(state = imageUploadInitialState, action) {
  switch(action.type) {

    case 'HANDLE_IMAGE_CHANGE' : {
      return {
        ...state,
        file: action.file,
        imagePreviewUrl: action.imagePreviewUrl,
      }
    }

    default : return state
  }
}
