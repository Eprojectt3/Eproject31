using backend.Entity;

namespace backend.Helper
{
    public class ImageService
    {
        private readonly IWebHostEnvironment environment;
        public ImageService(IWebHostEnvironment environment)
        {

            this.environment = environment;
        }
        private string GetFilepath(string productcode, string type)
        {
            return this.environment.WebRootPath + $"\\Upload\\{type}\\" + productcode;
        }
        public List<string> GetUrlImage(string productcode, string type, HttpRequest httpRequest)
        {
            List<string> Imageurl = new List<string>();
            string hosturl = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}";
            try
            {
                string Filepath = GetFilepath(productcode, type);

                if (System.IO.Directory.Exists(Filepath))
                {
                    DirectoryInfo directoryInfo = new DirectoryInfo(Filepath);
                    FileInfo[] fileInfos = directoryInfo.GetFiles();
                    foreach (FileInfo fileInfo in fileInfos)
                    {
                        string filename = fileInfo.Name;
                        string imagepath = Filepath + "\\" + filename;
                        if (System.IO.File.Exists(imagepath))
                        {
                            string _Imageurl = hosturl + "/Upload/" + type + "/" + productcode + "/" + filename;
                            Imageurl.Add(_Imageurl);
                        }
                    }
                }
                return Imageurl;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<string> Upload_Image(string productcode, string type,IFormFileCollection fileCollection)
        {
            try
            {
                string Filepath = GetFilepath(productcode, type);
                if (!System.IO.Directory.Exists(Filepath))
                {
                    System.IO.Directory.CreateDirectory(Filepath);
                }
                var result = new List<string>();
                foreach (var file in fileCollection)
                {
                    string imagepath = Filepath + "\\" + file.FileName;
                    if (System.IO.File.Exists(imagepath))
                    {
                        System.IO.File.Delete(imagepath);
                    }
                    using (FileStream stream = System.IO.File.Create(imagepath))
                    {
                         file.CopyToAsync(stream);

                    }
                    result.Add(file.FileName);
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
