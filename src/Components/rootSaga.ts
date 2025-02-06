import { all } from "redux-saga/effects";
import watchFetchArtist from "./artistSaga";
import watchTopAlbum from "./topAlbumSaga";
import watchFetchTracks from "./tracksSaga";
import { watchSongUpload, watchDeleteSong } from "./userSongSaga";
import { watchUserImages } from "./userImageSaga";
import { watchAuth } from "./authSaga";

export function* rootSaga() {
  yield all([
    watchTopAlbum(),
    watchFetchArtist(),
    watchFetchTracks(),
    watchSongUpload(),
    watchDeleteSong(),
    watchUserImages(),
    watchAuth(),
  ]);
}