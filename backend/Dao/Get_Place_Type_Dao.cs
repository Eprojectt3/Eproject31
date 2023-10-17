using webapi.Data;

namespace backend.Dao
{
    public class Get_Place_Type_Dao
    {
        public DataContext context;
        public Get_Place_Type_Dao(DataContext context)
        {
            this.context = context;
        }
        public string Get_Name_Type(int id)
        {
            var query = (from placeType in context.PlaceTypes
                         where placeType.ID == id
                         select placeType.Name)
                        .FirstOrDefault();

            return query;
        }


    }
}

