import {playMode} from '../common/js/config'
const state={
singer:{},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
   disc: {},
   topList:{}
  // topList: {},
  // searchHistory: loadSearch(),
  // playHistory: loadPlay(),
  // favoriteList: loadFavorite()
}
export default state
