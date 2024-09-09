import { TopChart } from "../swift/NativeModules";
import { PersonalizedChart } from "../swift/NativeModules";


export const GetTopChart = async (genre:string): Promise<string[]|undefined> =>{
    try{
        const topchartresponce = await new Promise<string[]|undefined>((resolve, reject)=> {
            TopChart(genre, resolve, reject)
        });
        return topchartresponce
      } catch(error){
        console.error("TopChartの取得に失敗しました:", error);
        return undefined;
      } 
    };

export const GetPersonalizedrecommendation = async (): Promise<string[]|undefined> =>{
    try{
        const personalizedresponce = await new Promise<string[]|undefined>((resolve, reject)=> {
            PersonalizedChart( resolve, reject)
        });
        return personalizedresponce
      } catch(error){
        console.error("Personalizedrecommendaionの取得に失敗しました:", error);
        return undefined;
      } 
    };

