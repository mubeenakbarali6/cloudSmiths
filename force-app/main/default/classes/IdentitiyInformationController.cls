public  without sharing class IdentitiyInformationController {
    
    @AuraEnabled
    public static void processIdentityInformation(String southAfricaId) {
        
        Identification_Information__c identityInformation;
        List <Identification_Information__c> identityInformationList =  [Select Id, Search_Count__c from Identification_Information__c where Name=:southAfricaId];
        if(identityInformationList.size() == 0){
            Identification_Information__c identity = decodeInformation(southAfricaId);
            insert identity;
        } else {
            identityInformationList[0].Search_Count__c++;
            update identityInformationList[0];
        }
    }
    
    public static Identification_Information__c decodeInformation(String southAfricaId){
        
        return new Identification_Information__c(
            Name = southAfricaId,
            Date_of_Birth__c = Date.newInstance(Integer.ValueOf('19'+southAfricaId.subString(0, 2)), Integer.ValueOf(southAfricaId.subString(2, 4)), Integer.ValueOf(southAfricaId.subString(4, 6))),
            Gender__c = Integer.ValueOf(southAfricaId.subString(6, 10)) > 4999 ? 'Male' : 'Female',
            SA_Citizen__c = southAfricaId.subString(10, 11) == '0' ? true : false );
    }
    
}