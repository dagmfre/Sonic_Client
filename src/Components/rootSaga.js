import { all } from "redux-saga/effects";
import watchFetchArtist from "./artistSaga";
import watchTopAlbum from "./topAlbumSaga";
import watchFetchTracks from "./tracksSaga";
import { watchSongUpload, watchDeleteSong } from "./userSongSaga";

export function* rootSaga() {
  yield all([
    watchTopAlbum(),
    watchFetchArtist(),
    watchFetchTracks(),
    watchSongUpload(),
    watchDeleteSong(),
  ]);
}
