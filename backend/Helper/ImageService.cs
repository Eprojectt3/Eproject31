using System.Drawing;
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
        public List<ImageDto> GetUrlImage(string productcode, string type, HttpRequest httpRequest)
        {
            var Imageurl = new List<ImageDto>();
            string hosturl = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}";
            var path_img = new List<string>(); 
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
        public string DeleteImage(string productcode, string type)
        {
            try
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot","Upload", type, productcode);
                Directory.Delete(path, true);
                return "Xóa Thành Công";
            }catch (Exception ex)
            {
                throw ex;
            }

        }
        public List<string> Update_Image(string objectdto,string? object1,string type,List<string> paths,IFormFileCollection fileCollection)
        {
            List<string> result = new List<string>();
            string Filepath = GetFilepath(objectdto, type);
            var image_path_fe = new List<string>();
            var image_path_sever = new List<string>();
            var differnce_image = new List<string>();
            var existing_path = new List<string>();
                //Update toàn bộ ảnh DONE
                if (paths == null)
                {
                    Directory.Delete(Filepath,true);
                    result = Upload_Image(objectdto, type, fileCollection);                 
                }
                //Update 1 vài ảnh 
                else
                {   
                //Lấy đường dẫn FE truyền xuống và đưa vào trong mảng
                foreach (var path in paths)
                {
                    string cleanedData = path.Replace("\\\\", "\\");

                    string path_api = Path.Combine(Directory.GetCurrentDirectory(), cleanedData);

                    image_path_fe.Add(path_api);
                }

                string get_curren_folder;
                string subFolder = String.Equals(objectdto, object1, StringComparison.OrdinalIgnoreCase) ? objectdto : object1;
                get_curren_folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "C:\\C#\\Project3\\Eproject31\\backend\\wwwroot\\hotel\\test doi ten KHACH SAN TRANG VIET123", type, subFolder);
                var get_curren_folde_img = Directory.GetFiles(get_curren_folder);
                //lấy ảnh trong hệ thống và đưa vào trong mảng
                foreach(var image_sever in get_curren_folde_img)
                {
                    image_path_sever.Add(image_sever);
                }
                //Trường hợp trùng tên
                if (Directory.Exists(Filepath))
                        {
                    //Tìm kiếm những image khác trong image_path_sever
                    differnce_image = image_path_sever.Except(image_path_fe).ToList();
                    if (differnce_image.Count > 0)
                    {
                        foreach (string element in differnce_image)
                        {
                            File.Delete(element);
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
                          //tìm pathkhác nhau
                          differnce_image = image_path_sever.Except(image_path_fe).ToList();
                     if(differnce_image.Count > 0)
                    {
                        foreach (string element in differnce_image)
                        {
                            File.Delete(element);
                        }
                    }
                    //tìm path giống nhau 
                    existing_path = image_path_sever.Intersect(image_path_fe).ToList();
                    string des_Path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload", type, objectdto);
                    Directory.CreateDirectory(des_Path);
                    if (existing_path.Count > 0)
                    {
                        foreach (string element in existing_path)
                        {
                            string fileName = System.IO.Path.GetFileName(element);
                            string destinationPath = Path.Combine(des_Path, fileName);

                            File.Copy(element, destinationPath, true);
                        }                     
                    }
                    foreach (var file_image in fileCollection)
                    {
                        string destinationPath2 = Path.Combine(des_Path, Path.GetFileName(file_image.FileName));
                        using (FileStream stream = new FileStream(destinationPath2, FileMode.Append))
                        {
                            file_image.CopyToAsync(stream);

                        }
                    }                  
                    Directory.Delete(get_curren_folder, true);
                    
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

