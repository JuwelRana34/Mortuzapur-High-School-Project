import { TeachersList } from "@/app/Data/DemoData";
import Devider from "@/components/shared/Devider/Devider";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Mail, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

// --- MAIN COMPONENT ---
export default function TeacherDirectory() {
  // Sort logic: Active teachers only, Head Teacher first, then alphabetical by name
  const displayTeachers = useMemo(() => {
    return TeachersList.filter((teacher) => teacher.isActive !== false).sort(
      (a, b) => {
        if (a.isHeadTeacher && !b.isHeadTeacher) return -1;
        if (!a.isHeadTeacher && b.isHeadTeacher) return 1;
        return a.name.localeCompare(b.name, "bn-BD");
      },
    );
  }, []);

  // Helper function to get initials for fallback avatar
  const getInitials = (name: string) => {
    return name.charAt(0);
  };

  return (
    <section className="w-full bg-white py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
              শিক্ষকমণ্ডলী
            </h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী
          </h3>
          <p className="text-gray-600 text-lg">
            শিক্ষার্থীদের মেধা ও সৃজনশীলতা বিকাশে আমাদের একনিষ্ঠ এবং দক্ষ
            শিক্ষকরা সর্বদা প্রস্তুত।
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {displayTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className={`group relative flex flex-col items-center p-6 bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                teacher.isHeadTeacher
                  ? "border-primary/30 shadow-sm shadow-primary/10"
                  : "border-secondary/30 shadow-sm shadow-secondary/15"
              }`}
            >
              {/* Head Teacher Badge */}
              {teacher.isHeadTeacher && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-secondary text-secondary-foreground border-secondary rounded-full p-1 gap-1.5 shadow-sm px-3">
                    <Award className="w-3.5 h-3.5" />
                    প্রধান শিক্ষক
                  </Badge>
                </div>
              )}

              {/* Avatar / Photo */}
              <div className="relative mb-5 mt-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10 bg-primary/10 shadow-sm shadow-primary/20 group-hover:border-primary/20 transition-colors">
                  {teacher.photoUrl ? (
                    <Image
                      src={teacher.photoUrl}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-indigo-50 text-blue-600 text-3xl font-bold">
                      {getInitials(teacher.name)}
                    </div>
                  )}
                </div>
              </div>

              {/* Teacher Info */}
              <div className="text-center flex-1 w-full">
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {teacher.name}
                </h4>
                <p className="text-sm font-medium text-blue-600 mb-4">
                  {teacher.subject}
                </p>
                {/* Divider */}
                <Devider
                  color1="from-transparent"
                  color2="via-primary/60"
                  color3="to-transparent"
                />

                {teacher.isShowContactInfo ? (
                  <div className="flex items-center justify-center gap-2">
                    {/* Email Contact */}
                    <a
                      href={`mailto:${teacher.email}`}
                      className="inline-flex items-center justify-center gap-2 text-sm bg-primary/10 text-primary  hover:text-secondary/80 hover:bg-secondary/15 transition-colors w-full px-2 py-2 rounded-lg hover:shadow-lg hover:shadow-secondary/20"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${teacher.phone}`}
                      className="inline-flex items-center justify-center gap-2 text-sm text-primary bg-primary/10 hover:text-secondary/80 hover:bg-secondary/15 transition-colors w-full px-2 py-2 rounded-lg hover:shadow-lg hover:shadow-secondary/20"
                    >
                      <PhoneCallIcon className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="h-10">
                    <p className="text-sm text-rose-400 italic">
                      যোগাযোগের তথ্য গোপন{" "}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
