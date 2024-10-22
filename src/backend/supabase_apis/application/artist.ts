import type { ArtistRepository } from '../dao/artist';
import type { Artist, CArtistParams } from '../model/artists';

export interface IArtistApplication {
  registerArtist(artistData: CArtistParams): Promise<string>;
  searchArtist(searchParam: string): Promise<Artist[]>;
}

export class ArtistApplication implements IArtistApplication {
  private artistDao: ArtistRepository;
  constructor(artistRepository: ArtistRepository) {
    this.artistDao = artistRepository;
  }

  async registerArtist(artistData: CArtistParams): Promise<string> {
    var input;
    if (artistData.musickitId === undefined) {
      artistData.musickitId = null;
    }

    const exist = await this.artistDao.existArtist(
      artistData.artistName,
      artistData.musickitId,
    );
    if (exist) {
      throw new Error('artist is already registered');
    }

    const result = await this.artistDao.registerArtist(artistData);
    return result;
  }

  async searchArtist(searchParam: string): Promise<Artist[]> {
    const result = await this.artistDao.searchArtist(searchParam);
    return result;
  }
}
