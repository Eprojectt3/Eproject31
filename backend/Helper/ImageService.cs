using System.Runtime.InteropServices;
using backend.Entity;
using Pipelines.Sockets.Unofficial.Arenas;

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
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                return this.environment.WebRootPath + $"/Upload/{type}/" + productcode;
            }
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
                        string imagepath;

                        if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                        {
                            imagepath = Filepath + "/" + filename;
                            if (System.IO.File.Exists(imagepath))
                            {
                                string _Imageurl = hosturl + "/Upload/" + type + "/" + productcode + "/" + filename;
                                Imageurl.Add(_Imageurl);
                            }
                        } else if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                        {
                            imagepath = Filepath + "\\" + filename;
                            if (System.IO.File.Exists(imagepath))
                            {
                                string _Imageurl = hosturl + "/Upload/" + type + "/" + productcode + "/" + filename;
                                Imageurl.Add(_Imageurl);
                            }
                        }
                        // string imagepath = Filepath + "\\" + filename;

                    }
                }
                return Imageurl;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<string> Upload_Image(string productcode, string type, IFormFileCollection fileCollection)
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
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
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
                    } else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        string imagepath = Filepath + "/" + file.FileName;
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


                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// TEST123
        /// </summary>
        /// <param name="productcode"></param>
        /// <param name="type"></param>
        /// <param name="httpRequest"></param>
        /// <returns></returns>
        public List<ImageDto> GetUrlImage1(string productcode, string type, HttpRequest httpRequest)
        {
            var Imageurl = new List<ImageDto>();
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
                        string imagepath;


                        imagepath = Filepath + "\\" + filename;
                        if (System.IO.File.Exists(imagepath))
                        {
                            string _Imageurl = hosturl + "/Upload/" + type + "/" + productcode + "/" + filename;
                            Imageurl.Add(new ImageDto
                            {
                                Image = _Imageurl,
                                Path = Path.Combine("wwwroot", "Upload", type, productcode, filename),
                            });
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
        public List<string> DeleteImage(List<string> path_images)
        {
            var result = new List<string>();
            if(path_images != null)
            {
                foreach (var path in path_images)
                {
                    var path_image = Path.Combine(Directory.GetCurrentDirectory(), path);

                    try
                    {
                        File.Delete(path_image);
                        result.Add($"Removed image {path} from the server successfully");
                    }
                    catch (Exception ex)
                    {
                        result.Add($"Failed to remove image {path}: {ex.Message}");
                    }
                }
            }
            
            return result;
        }
        public List<string> Update_Image(string objectdto,string? object1,string type,List<string> paths,IFormFileCollection fileCollection)
        {
            List<string> result = new List<string>();
            string Filepath = GetFilepath(objectdto, type);
           

                //Update toàn bộ ảnh DONE
                if (paths == null)
                {
                    Directory.Delete(Filepath,true);
                    result = Upload_Image(objectdto, type, fileCollection);                 
                }
                //Update 1 vài ảnh 
                else
                {
                string get_curren_folder;
                string subFolder = String.Equals(objectdto, object1, StringComparison.OrdinalIgnoreCase) ? objectdto : object1;
                get_curren_folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload", type, subFolder);
                foreach (var path in paths)
                    {
                    string cleanedData = path.Replace("\\\\", "\\");
                   
                    string path_api = Path.Combine(Directory.GetCurrentDirectory(), cleanedData);
                  
                    var get_curren_folde_img = Directory.GetFiles(get_curren_folder);

                    //trùng tên DONE
                    if (File.Exists(Filepath))
                        {
                        foreach (string imagePath in get_curren_folde_img)
                            {
                                if (!string.Equals(imagePath, path_api, StringComparison.OrdinalIgnoreCase))
                                {
                                    File.Delete(imagePath);
                                }
                            }
                            foreach (var file_image in fileCollection)
                            {
                                //Thêm dữ liệu vào trong get_curren_folder
                                string destinationPath = Path.Combine(get_curren_folder, Path.GetFileName(file_image.FileName));
                                using (var fileStream = new FileStream(destinationPath, FileMode.Append))
                                {
                                    file_image.CopyToAsync(fileStream);
                                }
                            }
                        }
                        //khác tên productcode                
                        else
                        {
                        foreach (string imagePath in get_curren_folde_img)
                        {
                            if (!string.Equals(imagePath, path_api, StringComparison.OrdinalIgnoreCase))
                            {
                                File.Delete(imagePath);
                            }
                            else
                            {
                                string des_Path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload", type, objectdto);
                                Directory.CreateDirectory(des_Path);

                                string fileName = System.IO.Path.GetFileName(imagePath);
                                string destinationPath = Path.Combine(des_Path, fileName);

                                File.Copy(imagePath, destinationPath, true);

                                foreach (var file_image in fileCollection)
                                {
                                    string destinationPath2 = Path.Combine(des_Path, Path.GetFileName(file_image.FileName));
                                    using (FileStream stream = new FileStream(destinationPath2, FileMode.Append))
                                    {
                                        file_image.CopyToAsync(stream);

                                    }
                                }
                            }
                        }
                        Directory.Delete(get_curren_folder, true);
                    }
                }
                }
            return result;
        }
    }
    
    public class ImageDto
    {
        public string Image { get; set; }
        public string Path { get; set; }
    }

}

