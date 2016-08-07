// Import the neccesary modules.
import asyncq from "async-q";

import EZTV from "./providers/shows/eztv";
import HorribleSubs from "./providers/anime/horriblesubs";
import extratorrentShow from "./providers/shows/extratorrent";
import extratorrentMovie from "./providers/movies/extratorrent";
import katAnime from "./providers/anime/kat";
import katMovie from "./providers/movies/kat";
import katShow from "./providers/shows/kat";
import YTS from "./providers/movies/yts";
import Util from "./util";
import {
  collections,
  extratorrentAnimeProviders,
  extratorrentMovieProviders,
  extratorrentShowProviders,
  katAnimeProviders,
  katMovieProviders,
  katShowProviders
} from "./config/constants";

/** Class for scraping movies and shows. */
export default class Scraper {

  /**
   * Create a scraper object.
   * @param {Boolean} debug - Debug mode for extra output.
   */
  constructor(debug) {
    /**
     * The util object with general functions.
     * @property {Object}
     */
    Scraper._util = new Util();

    /**
     * Debug mode for extra output.
     * @type {Object}
     */
    Scraper._debug = debug;
  };

  /**
   * Start show scraping from ExtraTorrent.
   * @returns {Array} A list of all the scraped shows.
   */
  _scrapeExtraTorrentShows() {
    return asyncq.eachSeries(extratorrentShowProviders, async provider => {
      try {
        Scraper._util.setStatus(`Scraping ${provider.name}`);
        const extratorrentProvider = new extratorrentShow(provider.name, Scraper._debug);
        const extratorrentShows = await extratorrentProvider.search(provider);
        console.log(`${provider.name}: Done.`);
        return extratorrentShows;
      } catch (err) {
        return Scraper._util.onError(err);
      }
    });
  };

  /**
   * Start scraping from EZTV.
   * @returns {Array} A list of all the scraped shows.
   */
  async _scrapeEZTVShows() {
    try {
      const eztv = new EZTV("EZTV", Scraper._debug);
      Scraper._util.setStatus(`Scraping ${eztv.name}`);
      const eztvShows = await eztv.search();
      console.log(`${eztv.name}: Done.`);
      return eztvShows;
    } catch (err) {
      return Scraper._util.onError(err);
    }
  };

  /**
   * Start show scraping from KAT.
   * @returns {Array} A list of all the scraped shows.
   */
  _scrapeKATShows() {
    return asyncq.eachSeries(katShowProviders, async provider => {
      try {
        Scraper._util.setStatus(`Scraping ${provider.name}`);
        const katProvider = new katShow(provider.name, Scraper._debug);
        const katShows = await katProvider.search(provider);
        console.log(`${provider.name}: Done.`);
      } catch (err) {
        return Scraper._util.onError(err);
      }
    });
  };

  /**
   * Start movie scraping from ExtraTorrent.
   * @returns {Array} A list of all the scraped movies.
   */
  _scrapeExtraTorrentMovies() {
    return asyncq.eachSeries(extratorrentMovieProviders, async provider => {
      try {
        Scraper._util.setStatus(`Scraping ${provider.name}`);
        const extratorrentProvider = new extratorrentMovie(provider.name, Scraper._debug);
        const extratorrentMovies = await extratorrentProvider.search(provider);
        console.log(`${provider.name}: Done.`);
        return extratorrentMovies;
      } catch (err) {
        return Scraper._util.onError(err);
      }
    });
  };

  /**
   * Start movie scraping from KAT.
   * @returns {Array} A list of all the scraped movies.
   */
  _scrapeKATMovies() {
    return asyncq.eachSeries(katMovieProviders, async provider => {
      try {
        Scraper._util.setStatus(`Scraping ${provider.name}`);
        const katProvider = new katMovie(provider.name, Scraper._debug);
        const katShows = await katProvider.search(provider);
        console.log(`${provider.name}: Done.`);
        return katShows;
      } catch (err) {
        return Scraper._util.onError(err);
      }
    });
  };

  /**
   * Start scraping from YTS.
   * @returns {Array} A list of all the scraped movies.
   */
  async _scrapeYTSMovies() {
    try {
      const yts = new YTS("YTS");
      Scraper._util.setStatus(`Scraping ${yts.name}`);
      const ytsMovies = await yts.search();
      console.log(`${yts.name}: Done.`);
      return ytsMovies;
    } catch (err) {
      return Scraper._util.onError(err);
    }
  };

  /**
   * Start anime scraping from ExtraTorrent.
   * @returns {Array} A list of all the scraped movies.
   */
  _scrapeExtraTorrentAnime() {
    return asyncq.eachSeries(extratorrentAnimeProviders, async provider => {
      try {
        Scraper._util.setStatus(`Scraping ${provider.name}`);
        const extratorrentProvider = new extratorrentAnime(provider.name, Scraper._debug);
        const extratorrentAnimes = await extratorrentProvider.search(provider);
        console.log(`${provider.name}: Done.`);
        return extratorrentAnimes;
      } catch (err) {
        return Scraper._util.onError(err);
      }
    });
  };

  /**
   * Start scraping from HorribleSubs.
   * @returns {Array} A list of all the scraped anime.
   */
  async _scrapeHorribelSubsAnime() {
    try {
      const horribleSubs = new HorribleSubs("HorribleSubs", Scraper._debug);
      Scraper._util.setStatus(`Scraping ${horribleSubs.name}`);
      const horribleSubsAnime = await horribleSubs.search();
      console.log(`${horribleSubs.name}: Done.`);
      return horribleSubsAnime;
    } catch (err) {
      return Scraper._util.onError(err);
    }
  };

  /**
   * Start scraping from KAT.
   * @returns {Array} A list of all the scraped anime.
   */
  async _scrapeKATAnime() {
    return asyncq.eachSeries(katAnimeProviders, async provider => {
      try {
        Scraper._util.setStatus(`Scraping ${provider.name}`);
        const katProvider = new katAnime(provider.name, Scraper._debug);
        const katAnimes = await katProvider.search(provider);
        console.log(`${provider.name}: Done.`);
        return katAnimes;
      } catch (err) {
        return Scraper._util.onError(err);
      }
    });
  };

  /** Initiate the scraping for EZTV and KAT. */
  scrape() {
    Scraper._util.setLastUpdated();

    asyncq.eachSeries([
      this._scrapeEZTVShows,
      this._scrapeExtraTorrentShows,
      // this._scrapeKATShows,

      this._scrapeExtraTorrentMovies,
      // this._scrapeKATMovies,
      this._scrapeYTSMovies,

      this._scrapeExtraTorrentAnime,
      this._scrapeHorribelSubsAnime,
      // this._scrapeKATAnime
    ], scraper => scraper()).then(value => Scraper._util.setStatus()).then(res => asyncq.eachSeries(collections, collection => Scraper._util.exportCollection(collection))).catch(err => Scraper._util.onError(`Error while scraping: ${err}`));
  };

};
