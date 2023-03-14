public without sharing class holidaysContainerController {
    
    @AuraEnabled
    public static List<Holidays> getHolidays(String year){
        List<Holidays> hols = new List<Holidays>(); 
        Calendarific_API__mdt apiKeymdt = [Select Key__c from Calendarific_API__mdt limit 1];
    
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://calendarific.com/api/v2/holidays?api_key='+apiKeymdt.Key__c+'&country=ZA&year='+year);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        
        if(res.getStatusCode() == 200){
            Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
            Map<String, Object> a = (Map<String, Object>) m.get('response');
            List<Object> b = (List<Object>)a.get('holidays');
            
            for(Object o:b){
                Holidays h = new Holidays();
                h.description = String.valueOf(o).split('description=')[1].split(', locations')[0];
                h.date_Z = Date.valueOf(String.valueOf(o).split('iso=')[1].split('}')[0]);
                h.primary_type = String.valueOf(o).split('primary_type=')[1].split(',')[0];
                hols.add(h);
            }
        }
        
        return hols;
    }
    
    public class Holidays {
        @AuraEnabled
        public String description; 
    
        @AuraEnabled
        public Date date_Z; // in json: date
        
        @AuraEnabled 
        public String primary_type; 
    }
}