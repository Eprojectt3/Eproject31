namespace backend.Helper
{
    public class Pagination<T>
    {
        public Pagination(int pageIndex, int pageSize, IReadOnlyList<T> data, int count, int totalPageIndex)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            Data = data;
            Count = count;
            TotalPageIndex = totalPageIndex;
        }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public IReadOnlyList<T>? Data { get;}
        public int Count { get; set; }
        public int TotalPageIndex { get; set; }
    }
}
