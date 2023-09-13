namespace backend.Helper
{
    public class Pagination<T>
    {
        public Pagination(int pageIndex, int pageSize, IReadOnlyList<T> data)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            Data = data;
        }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public IReadOnlyList<T> Data { get; set; }
    }
}
