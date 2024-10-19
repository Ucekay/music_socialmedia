import { ArtistRepository } from "../dao/artist";
import { CArtistParams, Artist } from "../model/artists";

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
        try {
            var input 
            if (artistData.musickitId === undefined) {
                artistData.musickitId = null;
            }

            const exist = await this.artistDao.existArtist(artistData.artistName, artistData.musickitId);
            if (exist) {
                throw new Error('artist is already registered');
            }

            const result = await this.artistDao.registerArtist(artistData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async searchArtist(searchParam: string): Promise<Artist[]> {
        try {
            const result = await this.artistDao.searchArtist(searchParam);
            return result;
        } catch (error) {
            throw error;
        }
    }
}