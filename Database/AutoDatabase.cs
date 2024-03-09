using Car_Dealer.Models;
using Microsoft.EntityFrameworkCore;

namespace Car_Dealer.Database
{
    public class AutoDatabase : DbContext
    {
        public AutoDatabase(DbContextOptions<AutoDatabase> options) : base(options) {

        }
        public DbSet<AutoModel> Autos { get; set; }
        public DbSet<AutoImageModel> AutosImages{ get; set; }
    }
}
